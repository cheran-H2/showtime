package com.example.ticketbooking.Entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection  = "Bookings")
public class model {
    @Id
    private String id;
    private String moviename;
    private String theatre;
    private String showTime;
    private List<String> seats;
    private Double totalAmount;
    private String date;

    private String customerName;

    public model() {
    }

    public model(String moviename, String theatre, String showTime, List<String> seats, Double totalAmount, String date, String customerName) {
        this.moviename = moviename;
        this.theatre = theatre;
        this.showTime = showTime;
        this.seats = seats;
        this.totalAmount = totalAmount;
        this.date = date;
        this.customerName = customerName;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getMoviename() {
        return moviename;
    }
    public void setMoviename(String moviename) {
        this.moviename = moviename;
    }

    public String getTheatre() {
        return theatre;
    }
    public void setTheatre(String theatre) {
        this.theatre = theatre;
    }

    public String getShowTime() {
        return showTime;
    }
    public void setShowTime(String showTime) {
        this.showTime = showTime;
    }

    public List<String> getSeats() {
        return seats;
    }
    public void setSeats(List<String> seats) {
        this.seats = seats;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }
    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
}
