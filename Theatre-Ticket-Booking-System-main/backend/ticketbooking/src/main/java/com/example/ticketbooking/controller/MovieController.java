package com.example.ticketbooking.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.ticketbooking.Entity.Movie;
import com.example.ticketbooking.Repository.MovieRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {

    private final MovieRepository movieRepository;

    public MovieController(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @GetMapping("/all")
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable String id) {
        Optional<Movie> movie = movieRepository.findById(id);
        return movie.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public Movie addMovie(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }

    @PostMapping("/seed")
    public List<Movie> seedMovies(@RequestBody List<Movie> movies) {
        return movieRepository.saveAll(movies);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMovie(@PathVariable String id) {
        if (movieRepository.existsById(id)) {
            movieRepository.deleteById(id);
            return ResponseEntity.ok("Movie deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
