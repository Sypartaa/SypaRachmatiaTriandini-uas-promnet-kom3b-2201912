package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	Routers()
}

func Routers() {
	InitDB()
	defer db.Close()
	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter()
	router.HandleFunc("/reports", CreateMoney).Methods("POST")
	router.HandleFunc("/reports", GetMoneys).Methods("GET")
	router.HandleFunc("/reports/{id}", GetMoneyByID).Methods("GET")
	router.HandleFunc("/reports/{id}", UpdateMoney).Methods("PUT")
	router.HandleFunc("/reports/{id}", DeleteMoney).Methods("DELETE")
	http.ListenAndServe(":9080", &CORSRouterDecorator{router})
}

// Create new transaction
func CreateMoney(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO transaksi_keuangan_syparachmatiatriandini(date, description, amount, status, receiver, jk, no_telp, address) VALUES(?,?,?,?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	var money Money
	json.Unmarshal(body, &money)

	_, err = stmt.Exec(money.Date, money.Description, money.Amount, money.Status, money.Receiver, money.Jk, money.NoTelp, money.Address)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "New transaction was created")
}

// Get all Transactions
func GetMoneys(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var moneys []Money

	result, err := db.Query("SELECT id, date, description, amount, status, receiver, jk, no_telp, address from transaksi_keuangan_syparachmatiatriandini")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	for result.Next() {
		var money Money
		err := result.Scan(&money.ID, &money.Date, &money.Description, &money.Amount, &money.Status, &money.Receiver, &money.Jk, &money.NoTelp, &money.Address)
		if err != nil {
			panic(err.Error())
		}
		moneys = append(moneys, money)
	}
	
	json.NewEncoder(w).Encode(moneys)
}

// Get transaction by ID
func GetMoneyByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	result, err := db.Query("SELECT id, date, description, amount, status, receiver, jk, no_telp, address from transaksi_keuangan_syparachmatiatriandini WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	var money Money
	for result.Next() {
		err := result.Scan(&money.ID, &money.Date, &money.Description, &money.Amount, &money.Status, &money.Receiver, &money.Jk, &money.NoTelp, &money.Address)
		if err != nil {
			panic(err.Error())
		}
	}
	json.NewEncoder(w).Encode(money)
}

// Update transaction by ID
func UpdateMoney(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE transaksi_keuangan_syparachmatiatriandini SET date=?, description=?, amount=?, status=?, receiver=?, jk=?, no_telp=?, address=? WHERE id=?")

	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	var money Money
	json.Unmarshal(body, &money)

	_, err = stmt.Exec(money.Date, money.Description, money.Amount, money.Status, money.Receiver, money.Jk, money.NoTelp, money.Address, params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Transaction with ID = %s was updated", params["id"])
}

// Delete Transaction by ID
func DeleteMoney(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("DELETE FROM transaksi_keuangan_syparachmatiatriandini WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Transaction with ID = %s was deleted", params["id"])
}

type Money struct {
	ID          int    `json:"id"`
	Date        string `json:"date"`
	Description string `json:"description"`
	Amount      string  `json:"amount"`
	Status      string `json:"status"`
	Receiver    string `json:"receiver"`
	Jk          string `json:"jk"`
	NoTelp      string `json:"no_telp"`
	Address     string `json:"address"`
}


var db *sql.DB
var err error

func InitDB() {
	db, err = sql.Open("mysql",
		"root:@tcp(127.0.0.1:3306)/db_2201912_syparachmatiatriandini_uas_pilkomb")
	if err != nil {
		panic(err.Error())
	}
}

type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter,
	req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Type, YourOwnHeader")
	}
	// Stop here if its Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}
