package com.example.ticketbooking.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.ticketbooking.Entity.Admin;
import com.example.ticketbooking.Repository.AdminRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/admins")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminRepository adminRepository;

    public AdminController(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username and password are required"));
        }

        // If no admins exist in MongoDB yet, seed default admin
        if (adminRepository.count() == 0) {
            Admin defaultAdmin = new Admin("admin", "admin123", "Super Admin", "SUPER_ADMIN");
            adminRepository.save(defaultAdmin);
        }

        Optional<Admin> adminOpt = adminRepository.findByUsername(username);

        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            if (admin.getPassword().equals(password)) {
                // Return success response without sending plain password back
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "id", admin.getId(),
                    "username", admin.getUsername(),
                    "name", admin.getName() != null ? admin.getName() : admin.getUsername(),
                    "role", admin.getRole() != null ? admin.getRole() : "ADMIN"
                ));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid username or password"));
    }

    // Get all admin users
    @GetMapping("/all")
    public List<Admin> getAllAdmins() {
        List<Admin> list = adminRepository.findAll();
        // Mask passwords for security
        list.forEach(a -> a.setPassword("••••••••"));
        return list;
    }

    // Add a new Admin user
    @PostMapping("/add")
    public ResponseEntity<?> addAdmin(@RequestBody Admin admin) {
        if (admin.getUsername() == null || admin.getUsername().trim().isEmpty() ||
            admin.getPassword() == null || admin.getPassword().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username and password are required"));
        }

        if (adminRepository.existsByUsername(admin.getUsername())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Admin username already exists"));
        }

        if (admin.getName() == null || admin.getName().trim().isEmpty()) {
            admin.setName(admin.getUsername());
        }
        if (admin.getRole() == null || admin.getRole().trim().isEmpty()) {
            admin.setRole("ADMIN");
        }

        Admin saved = adminRepository.save(admin);
        saved.setPassword("••••••••");
        return ResponseEntity.ok(saved);
    }

    // Delete an admin user
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable String id) {
        if (adminRepository.count() <= 1) {
            return ResponseEntity.badRequest().body(Map.of("message", "Cannot delete the only remaining admin user"));
        }

        if (adminRepository.existsById(id)) {
            adminRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Admin user deleted successfully"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
