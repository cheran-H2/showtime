package com.example.ticketbooking.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.ticketbooking.Entity.model;

public interface Repo  extends MongoRepository<model, String>{
      List<model> findByMoviename(String moviename);
}
    

