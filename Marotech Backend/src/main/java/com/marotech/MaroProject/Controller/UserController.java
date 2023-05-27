package com.marotech.MaroProject.Controller;

import com.marotech.MaroProject.Entity.User;
import com.marotech.MaroProject.Repository.UserRepository;
import com.marotech.MaroProject.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(path = "user")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping("getUsers")
    public ResponseEntity<List<User>> GetUsers() {
        return ResponseEntity.ok(userService.GetUsers());
    }

    @PostMapping("createUser")
    public ResponseEntity<User> CreateUser(@RequestBody User user) {
        user.setCreateDate(LocalDateTime.now());
        return ResponseEntity.ok(userService.CreateUser(user));
    }

    @PostMapping("getUserById")
    public ResponseEntity<Optional<User>> getUserById(@RequestBody long id) {

        Optional<User> foundUser = userService.GetUserById(id);
        return ResponseEntity.ok(foundUser);
    }

    @PutMapping("user/{id}")
    public ResponseEntity<User> UpdateUser(@PathVariable long id , @RequestBody User user){
        Optional<User> userData = userRepository.findById(id);

        User userUpdate = userData.get();
        userUpdate.setName(user.getName());
        userUpdate.setEmail(user.getEmail());
        userUpdate.setCreateDate(LocalDateTime.now());
        userUpdate.setStatus(user.getStatus());
        userUpdate.setCreateUser(user.getCreateUser());
        userUpdate.setRole(user.getRole());

        return new ResponseEntity<>(userRepository.save(userUpdate), HttpStatus.OK);
    }
}
