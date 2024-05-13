package com.myOffice.Project.dto;

import com.myOffice.Project.entity.Employee;
import com.myOffice.Project.entity.Place;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDTO {

    private LocalDate reservation_start_date;
    private LocalDate reservation_end_date;
    private Employee employee;
    private Place place;



}
