package com.myOffice.Project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.myOffice.Project.enums.EmployeeType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Size(max = 7 , message = "First Name should contain only 7 characters ")
    private String firstName;
    @Size(max = 7 ,  message = "Last Name should contain only 7 characters ")
    private String lastName;
    @Enumerated(EnumType.STRING)
    private EmployeeType type;
    @Column(unique = true)
    private String email;
    @Size(min = 6)
    private String password;
    @OneToMany(mappedBy = "employee")
    @JsonIgnore
    private List<Reservation> reservations;


    public Employee(String firstName, String lastName, String email, EmployeeType type , String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.type = type;
        this.password = password;
    }







}
