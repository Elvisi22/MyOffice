package com.myOffice.Project.controller;

import com.myOffice.Project.dto.EditReservationDTO;
import com.myOffice.Project.dto.ReservationDTO;
import com.myOffice.Project.entity.Reservation;
import com.myOffice.Project.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")

public class ReservationController {

    private ReservationService reservationService;


    @GetMapping("/get-all-reservations")
    public ResponseEntity<List<Reservation>> getAllReservations(){
        List<Reservation> allReservations = reservationService.getAllReservations();
        return new ResponseEntity<>(allReservations , HttpStatus.OK);
    }


    @PostMapping("/create-reservation")
    public ResponseEntity<ReservationDTO> createReservation(@RequestBody ReservationDTO reservationDTO) {
        try {
            ReservationDTO createdReservation = reservationService.createReservation(reservationDTO);
            return new ResponseEntity<>(createdReservation, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/update-reservation/{id}")
    public ResponseEntity<ReservationDTO> updateReservation(@PathVariable("id") Integer id,
                                                            @RequestBody EditReservationDTO reservationDTO) {
        try {
            ReservationDTO updatedReservation = reservationService.updateReservation(id, reservationDTO);
            return ResponseEntity.ok(updatedReservation);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/get-reservation-by-id/{id}")
    public EditReservationDTO getReservationById(@PathVariable("id") Integer id){
        return reservationService.getReservationById(id);
    }

    @GetMapping("/get-user-reservations/{id}")
    public List<Reservation> userReservations(@PathVariable("id") Integer id){
        return reservationService.getUserReservations(id);
    }


    @DeleteMapping("/delete-reservation-by-id/{id}")
    public void deleteReservation(@PathVariable("id")  Integer id){
        reservationService.deleteReservation(id);
    }


    @GetMapping("/check")
    public ResponseEntity<Reservation> checkReservationContainsDate(@RequestParam("date") LocalDate inputedDate, @RequestParam("userId") Integer userId) {
        Reservation reservation = reservationService.getReservationByDateAndUser(inputedDate, userId);
        if (reservation != null) {
            return new ResponseEntity<>(reservation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/availability")
    public LocalDate getAvailableDate(@RequestParam("placeId") Integer placeId){

        LocalDate newDate = reservationService.bookedUntil(placeId);
        return newDate;
    }

    @GetMapping("/bookedOrNo")
    public Boolean bookedOrNo(@RequestParam("placeId") Integer placeId) {

        return reservationService.bookedOrNo(placeId);
    }

    @GetMapping("/placeReservations")
    public List<Reservation> getAllReservationsForSelectedSeat(@RequestParam("placeId") Integer placeId){
        List<Reservation> allReservations = reservationService.findAllReservationsForThePlace(placeId);
        return allReservations;
    }


    @GetMapping("/countReservationsForUser")
    public Integer countReservationsByEmployeeId(@RequestParam("id") Integer id){
        return reservationService.countReservationsByEmployeeId(id);
    }


}
