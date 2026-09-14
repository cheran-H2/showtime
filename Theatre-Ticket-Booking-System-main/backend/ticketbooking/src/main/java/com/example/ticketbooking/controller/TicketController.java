package com.example.ticketbooking.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ticketbooking.Entity.model;
import com.example.ticketbooking.Repository.Repo;
import java.util.*;


@RestController
@RequestMapping("/tickets")
@CrossOrigin(origins = "http://localhost:5173")
public class TicketController {
   
    private Repo repo;

    public TicketController(Repo repo) {
        this.repo = repo;
    }   
    
    @PostMapping("/create")
    public model createTicket(@RequestBody model booking) {
        return repo.save(booking);
    }

    @GetMapping("/all")
    public List<model> getAllTickets() {
        return repo.findAll();
    }

    @GetMapping("/booked/{movieName}")
    public List<model> getBookedSeats(@PathVariable String movieName) {
        return repo.findByMoviename(movieName);
    }
}
