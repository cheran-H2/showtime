package com.example.ticketbooking.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.ticketbooking.Entity.Trailer;

public interface TrailerRepository extends MongoRepository<Trailer, String> {
}
