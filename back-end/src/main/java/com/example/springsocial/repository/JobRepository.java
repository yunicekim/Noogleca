package com.example.springsocial.repository;

import com.example.springsocial.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findAll();
    
    Optional<Job> findById(Long id);
    
    // Boolean existsByEmail(String email);

}

