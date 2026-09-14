package com.example.ticketbooking.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.ticketbooking.Entity.Trailer;
import com.example.ticketbooking.Repository.TrailerRepository;

import java.util.List;

@RestController
@RequestMapping("/trailers")
@CrossOrigin(origins = "http://localhost:5173")
public class TrailerController {

    private final TrailerRepository trailerRepository;

    public TrailerController(TrailerRepository trailerRepository) {
        this.trailerRepository = trailerRepository;
    }

    @GetMapping("/all")
    public List<Trailer> getAllTrailers() {
        return trailerRepository.findAll();
    }

    @PostMapping("/add")
    public Trailer addTrailer(@RequestBody Trailer trailer) {
        return trailerRepository.save(trailer);
    }

    @PostMapping("/seed")
    public List<Trailer> seedTrailers(@RequestBody List<Trailer> trailers) {
        return trailerRepository.saveAll(trailers);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTrailer(@PathVariable String id) {
        if (trailerRepository.existsById(id)) {
            trailerRepository.deleteById(id);
            return ResponseEntity.ok("Trailer deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
