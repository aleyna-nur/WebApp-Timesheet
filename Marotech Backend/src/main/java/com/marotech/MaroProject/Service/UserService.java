package com.marotech.MaroProject.Service;

import com.marotech.MaroProject.Entity.User;
import com.marotech.MaroProject.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> GetUsers() {
        List<User> users = userRepository.findAll();
        return users;
    }

    public User CreateUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> GetUserById(long id) {
        return userRepository.findById(id);
    }
}
