package com.marotech.MaroProject.Repository;

import com.marotech.MaroProject.Entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
