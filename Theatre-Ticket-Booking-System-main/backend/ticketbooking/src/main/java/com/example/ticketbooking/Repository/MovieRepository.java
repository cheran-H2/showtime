package com.example.ticketbooking.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.ticketbooking.Entity.Movie;

public interface MovieRepository extends MongoRepository<Movie, String> {
}
