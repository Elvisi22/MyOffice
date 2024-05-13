package com.myOffice.Project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Entity
@Data
@Getter
@Setter
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private LocalDate reservation_start_date;
    private LocalDate reservation_end_date;
    @ManyToOne
    @JsonIgnore
    private Employee employee;
    @ManyToOne
    @JsonIgnore
    private Place place;



}
