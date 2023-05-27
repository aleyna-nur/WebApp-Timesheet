package com.marotech.MaroProject.Service;

import com.marotech.MaroProject.Entity.*;
import com.marotech.MaroProject.Repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> GetCustomers(){
        List<Customer> customers = customerRepository.findAll();
        return customers;
    }

    public Customer CreateCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Optional<Customer> GetCustomerById(long id) {
        return customerRepository.findById(id);
    }
}