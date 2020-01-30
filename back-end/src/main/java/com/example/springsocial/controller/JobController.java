package com.example.springsocial.controller;

import com.example.springsocial.exception.BadRequestException;
import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.AuthProvider;
import com.example.springsocial.model.Job;
import com.example.springsocial.model.User;
import com.example.springsocial.payload.ApiResponse;
import com.example.springsocial.payload.AuthResponse;
import com.example.springsocial.payload.CreateJobRequest;
import com.example.springsocial.payload.LoginRequest;
import com.example.springsocial.payload.SignUpRequest;
import com.example.springsocial.repository.JobRepository;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.security.CurrentUser;
import com.example.springsocial.security.TokenProvider;
import com.example.springsocial.security.UserPrincipal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/job")
public class JobController {
	
    @Autowired
    private JobRepository jobRepository;
    
    private List<Job> jobList;
    
    @PreAuthorize("hasRole('USER')")
    @GetMapping("")
    public List<Job> getJobList() {
    	System.out.println("----------------------- /job");
        return jobRepository.findAll();
        		//.orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
    
    @PreAuthorize("hasRole('USER')")
	@PostMapping("/createjob")
	public ResponseEntity<?> registerJob(@Valid @RequestBody CreateJobRequest createJobRequest) {
//	    if(jobRepository.existsByEmail(signUpRequest.getEmail())) {
//	        throw new BadRequestException("Email address already in use.");
//	    }
    	System.out.println("----------------------- /job/createJob");
  

	    // Creating job
	    Job job = new Job();
	    
	    job.setPosition(createJobRequest.getPosition());
	    job.setcId(createJobRequest.getcId());
	    job.setDescription(createJobRequest.getDescription());
	    job.setUrl(createJobRequest.getUrl());
	    job.setuId(createJobRequest.getuId());
	    
	    Job result = jobRepository.save(job);

	    URI location = ServletUriComponentsBuilder
	            .fromCurrentContextPath().path("/")
	            .buildAndExpand(result.getJobId()).toUri();

	    return ResponseEntity.created(location)
	            .body(new ApiResponse(true, "Job added successfully@"));
	}

}





/*
package com.example.springsocial.controller;

import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.User;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.security.CurrentUser;
import com.example.springsocial.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}
*/
