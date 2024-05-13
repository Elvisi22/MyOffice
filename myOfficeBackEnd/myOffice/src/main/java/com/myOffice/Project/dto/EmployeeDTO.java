package com.myOffice.Project.dto;


import com.myOffice.Project.enums.EmployeeType;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {
    @Column(unique = true)
    private String email;

    @Size(max = 7 , message = "First Name should contain only 7 characters ")
    private String firstName;

    @Size(max = 7 ,  message = "Last Name should contain only 7 characters ")
    private String lastName;

    @Size(min = 6)
    private String password;



}
