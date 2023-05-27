package com.marotech.MaroProject.Repository;

import com.marotech.MaroProject.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
