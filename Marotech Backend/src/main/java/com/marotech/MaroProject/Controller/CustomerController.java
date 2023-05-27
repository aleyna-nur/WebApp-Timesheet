package com.marotech.MaroProject.Controller;

import com.marotech.MaroProject.Entity.Customer;
import com.marotech.MaroProject.Repository.CustomerRepository;
import com.marotech.MaroProject.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(path = "customer")
public class CustomerController {
    private final CustomerService customerService;
    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerController(CustomerService customerService, CustomerRepository customerRepository) {
        this.customerService = customerService;
        this.customerRepository = customerRepository;
    }

    @GetMapping("getCustomers")
    public ResponseEntity<List<Customer>> GetCustomers() {
        return ResponseEntity.ok(customerService.GetCustomers());
    }

    @PostMapping("createCustomer")
    public ResponseEntity<Customer> CreateCustomer(@RequestBody Customer customer) {
        customer.setCreateDate(LocalDateTime.now());
        return ResponseEntity.ok(customerService.CreateCustomer(customer));
    }

    @PostMapping("getCustomerById")
    public ResponseEntity<Optional<Customer>> getCustomerById(@RequestBody long id) {

        Optional<Customer> foundCustomer = customerService.GetCustomerById(id);
        return ResponseEntity.ok(foundCustomer);
    }

    @PutMapping("customer/{id}")
    public ResponseEntity<Customer> UpdateCustomer(@PathVariable long id , @RequestBody Customer customer){
        Optional<Customer> customerData = customerRepository.findById(id);

        Customer customerUpdate = customerData.get();
        customerUpdate.setName(customer.getName());
        customerUpdate.setLocation(customer.getLocation());
        customerUpdate.setStatus(customer.getStatus());
        customerUpdate.setCreateDate(LocalDateTime.now());
        customerUpdate.setCreateUser(customer.getCreateUser());

        return new ResponseEntity<>(customerRepository.save(customerUpdate), HttpStatus.OK);
    }
}








