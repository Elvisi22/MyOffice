package com.myOffice.Project.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data

public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;
    @Column(unique = true)
    Integer number;
    @OneToMany(mappedBy = "place")
    private List<Reservation> reservations;

}
