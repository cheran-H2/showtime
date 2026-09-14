package com.example.ticketbooking.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.ticketbooking.Entity.Admin;
import java.util.Optional;

public interface AdminRepository extends MongoRepository<Admin, String> {
    Optional<Admin> findByUsername(String username);
    boolean existsByUsername(String username);
}
