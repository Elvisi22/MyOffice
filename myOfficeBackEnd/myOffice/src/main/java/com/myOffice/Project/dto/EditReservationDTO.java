package com.myOffice.Project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;



@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class EditReservationDTO {
    private LocalDate reservationStartDate;
    private LocalDate reservationEndDate;
    private Integer employeeId;
    private Integer placeId;
    private Integer placeNumber;

}



