package com.myOffice.Project.service;

import com.myOffice.Project.dto.EmployeeDTO;
import com.myOffice.Project.entity.Employee;
import com.myOffice.Project.enums.EmployeeType;
import com.myOffice.Project.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EmployeeService {

    private EmployeeRepository employeeRepository;



    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }


    public void deleteUser(Integer id){
        employeeRepository.deleteById(id);
    }


    public Integer createUser(EmployeeDTO employeeDTO) throws Exception{
        if(employeeDTO.getEmail() == null || employeeDTO.getFirstName() == null || employeeDTO.getLastName() == null || employeeDTO.getPassword() == null){
            throw new Exception("Please complete all the user info");
        }
        Employee employee = new Employee(
                employeeDTO.getFirstName(),
                employeeDTO.getLastName(),
                employeeDTO.getEmail(),
                EmployeeType.USER,
                employeeDTO.getPassword()

        );
       Employee createdEmployee = employeeRepository.save(employee);
       return createdEmployee.getId();
    }


    public Optional<EmployeeDTO> getEmployeeById(Integer id) throws Exception{

        Optional<Employee> employee = employeeRepository.findById(id);
        if(employee.isEmpty()){
            throw new Exception("Employee does not exist");
        }

        Employee foundEmployee = employee.get();

        return Optional.of(new EmployeeDTO(
                foundEmployee.getEmail(),
                foundEmployee.getFirstName(),
                foundEmployee.getLastName(),
                foundEmployee.getPassword()
        ));
    }


    public Integer updateEmployee(Integer id , EmployeeDTO employeeDTO) throws  Exception{
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new Exception("Employee with id" + id + " not found"));
        employee.setFirstName(employeeDTO.getFirstName());
        employee.setLastName(employeeDTO.getLastName());
        employee.setEmail(employeeDTO.getEmail());
        employee.setPassword(employeeDTO.getPassword());

        employeeRepository.save(employee);
        return employee.getId();
    }




}
