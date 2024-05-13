package com.myOffice.Project.controller;

import com.myOffice.Project.dto.EmployeeDTO;
import com.myOffice.Project.entity.Employee;
import com.myOffice.Project.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@AllArgsConstructor
@RestController
public class EmployeeController {

    private EmployeeService employeeService;


    @GetMapping("/get-all-employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> allEmployees = employeeService.getAllEmployees();
        return new ResponseEntity<>(allEmployees, HttpStatus.OK);
    }

    @PostMapping("/create-user")
    public ResponseEntity<Integer> createEmployee(@RequestBody EmployeeDTO employeeDTO) throws Exception {
        return ResponseEntity.ok(employeeService.createUser(employeeDTO));
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Optional<EmployeeDTO>> findEmployee(@PathVariable(name = "id") Integer id) throws Exception {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }


    @PutMapping("/update/employee/{id}")
    public ResponseEntity<Integer> updateEmployee(@PathVariable(name = "id") Integer id, @RequestBody EmployeeDTO employeeDTO) throws Exception {
        return new ResponseEntity<>(employeeService.updateEmployee(id, employeeDTO), HttpStatus.OK);
    }

    @DeleteMapping("delete/employee/{id}")
    public ResponseEntity<Void>deleteEmployee(@PathVariable (name = "id") Integer id) throws Exception{
        employeeService.deleteUser(id);
        return ResponseEntity.ok().build();
    }



}
