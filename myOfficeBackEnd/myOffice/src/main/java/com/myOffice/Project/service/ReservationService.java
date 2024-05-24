package com.myOffice.Project.service;

import com.myOffice.Project.dto.EditReservationDTO;
import com.myOffice.Project.dto.ReservationDTO;
import com.myOffice.Project.entity.Employee;
import com.myOffice.Project.entity.Place;
import com.myOffice.Project.entity.Reservation;
import com.myOffice.Project.repository.EmployeeRepository;
import com.myOffice.Project.repository.PlacesRepository;
import com.myOffice.Project.repository.ReservationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ReservationService {

    private ReservationRepository reservationRepository;
    private EmployeeRepository employeeRepository;
    private PlacesRepository placesRepository;


public ReservationDTO createReservation(ReservationDTO reservationDTO) throws Exception {
    try {
        // Find the employee from the database
        Optional<Employee> optionalEmployee = employeeRepository.findById(reservationDTO.getEmployee().getId());
        if (optionalEmployee.isEmpty()) {
            throw new Exception("Employee not found");
        }
        Employee employee = optionalEmployee.get();

        // Find the place from the database
        Optional<Place> optionalPlace = placesRepository.findById(reservationDTO.getPlace().getId());
        if (optionalPlace.isEmpty()) {
            throw new Exception("Place not found");
        }
        Place place = optionalPlace.get();

        // Check if the reservation duration is not more than 7 days
        long duration = ChronoUnit.DAYS.between(reservationDTO.getReservation_start_date(), reservationDTO.getReservation_end_date());
        if (duration > 7) {
            throw new Exception("Reservation duration cannot be more than 7 days");
        }

        // Check if the employee has any overlapping reservations
        List<Reservation> employeeOverlappingReservations = reservationRepository.findByEmployeeAndDatesOverlap(employee,
                reservationDTO.getReservation_start_date(), reservationDTO.getReservation_end_date());
        if (!employeeOverlappingReservations.isEmpty()) {
            throw new Exception("Employee has another reservation during the selected dates");
        }

        // Check if the place is available during the selected dates
        List<Reservation> placeOverlappingReservations = reservationRepository.findByPlaceAndDatesOverlap(place,
                reservationDTO.getReservation_start_date(), reservationDTO.getReservation_end_date());
        if (!placeOverlappingReservations.isEmpty()) {
            throw new Exception("Place is not available during the selected dates");
        }

        // Create a new reservation
        Reservation reservation = new Reservation();
        reservation.setReservation_start_date(reservationDTO.getReservation_start_date());
        reservation.setReservation_end_date(reservationDTO.getReservation_end_date());
        reservation.setEmployee(employee);
        reservation.setPlace(place);

        // Save the reservation to the database
        reservationRepository.save(reservation);

        // Return the created reservation DTO
        return new ReservationDTO(
                reservation.getReservation_start_date(),
                reservation.getReservation_end_date(),
                reservation.getEmployee(),
                reservation.getPlace()
        );
    } catch (Exception e) {
        // Handle exceptions and return a meaningful message
        throw new Exception("Error creating reservation: " + e.getMessage(), e);
    }
}

    // Service method to update an existing reservation
    public ReservationDTO updateReservation(Integer id, EditReservationDTO reservationDTO) throws Exception {
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if (optionalReservation.isEmpty()) {
            throw new Exception("Reservation not found");
        }
        Reservation reservation = optionalReservation.get();

        Optional<Employee> optionalEmployee = employeeRepository.findById(reservationDTO.getEmployeeId());
        if (optionalEmployee.isEmpty()) {
            throw new Exception("Employee not found");
        }
        Employee employee = optionalEmployee.get();

        Optional<Place> optionalPlace = placesRepository.findById(reservationDTO.getPlaceId());
        if (optionalPlace.isEmpty()) {
            throw new Exception("Place not found");
        }
        Place place = optionalPlace.get();

        List<Reservation> overlappingReservations = reservationRepository.findByPlaceAndDatesOverlap(
                place,
                reservationDTO.getReservationStartDate(),
                reservationDTO.getReservationEndDate()
        );
        overlappingReservations.removeIf(r -> r.getId().equals(id)); // Exclude current reservation from overlap check
        if (!overlappingReservations.isEmpty()) {
            throw new Exception("Place is not available during the selected dates");
        }

        long daysBetween = ChronoUnit.DAYS.between(reservationDTO.getReservationStartDate(), reservationDTO.getReservationEndDate());
        if (daysBetween > 7) {
            throw new IllegalArgumentException("Reservation period cannot exceed 7 days");
        }

        reservation.setReservation_start_date(reservationDTO.getReservationStartDate());
        reservation.setReservation_end_date(reservationDTO.getReservationEndDate());
        reservation.setEmployee(employee);
        reservation.setPlace(place);

        reservationRepository.save(reservation);

        return new ReservationDTO(
                reservation.getReservation_start_date(),
                reservation.getReservation_end_date(),
                reservation.getEmployee(),
                reservation.getPlace()
        );
    }



    public List<Reservation> getAllReservations(){
        return reservationRepository.findAll();
    }


    public EditReservationDTO getReservationById(Integer id){
        Optional<Reservation> findreservation = reservationRepository.findById(id);
        Reservation reservation = findreservation.get();

        return new EditReservationDTO(
                reservation.getReservation_start_date(),
                reservation.getReservation_end_date(),
                reservation.getEmployee().getId(),
                reservation.getPlace().getId(),
                reservation.getPlace().getNumber()

        );
    }


    public void deleteReservation(Integer id){
        reservationRepository.deleteById(id);
    }


    public List<Reservation> getUserReservations(Integer id){
        return reservationRepository.getUserReservationsList(id);
    }







   

    public Reservation getReservationByDateAndUser(LocalDate inputedDate, Integer userId) {
        // Get reservations of the user
        List<Reservation> userReservations = reservationRepository.getUserReservationsList(userId);

        // Iterate through each reservation
        for (Reservation reservation : userReservations) {
            LocalDate startDate = reservation.getReservation_start_date();
            LocalDate endDate = reservation.getReservation_end_date();

            // Check if the inputedDate falls within the reservation dates
            if ((inputedDate.isEqual(startDate) || inputedDate.isAfter(startDate)) &&
                    (inputedDate.isEqual(endDate) || inputedDate.isBefore(endDate))) {
                // If the inputedDate is within the reservation dates, return the reservation
                return reservation;
            }
        }

        // If no reservation contains the inputedDate, return null or handle it as needed
        return null;
    }



    public LocalDate bookedUntil(Integer placeId){
        List<Reservation> reservationsForSelectedPlace = reservationRepository.findByPlaceId(placeId);

        LocalDate currentDate = LocalDate.now();

        // Iterate through reservations
        for (Reservation reservation : reservationsForSelectedPlace) {
            // Check if current date is within the reservation's date range
            if (currentDate.isAfter(reservation.getReservation_start_date())
                    && currentDate.isBefore(reservation.getReservation_end_date())) {
                // If current date is within the reservation's date range, return the reservation's end date
                return reservation.getReservation_end_date();
            }
        }

        // If no reservation is currently running, return null or handle it as needed
        return null;


    }


    public List<Reservation> findAllReservationsForThePlace(Integer placeId){
        List<Reservation> reservationsForSelectedPlace = reservationRepository.findByPlaceId(placeId);
        return reservationsForSelectedPlace;


    }



    public Boolean bookedOrNo(Integer placeId){
        List<Reservation> reservationsForSelectedPlace = reservationRepository.findByPlaceId(placeId);

        LocalDate currentDate = LocalDate.now();

        // Iterate through reservations
        for (Reservation reservation : reservationsForSelectedPlace) {
            // Check if current date is within the reservation's date range
            if (currentDate.isAfter(reservation.getReservation_start_date())
                    && currentDate.isBefore(reservation.getReservation_end_date())) {
                // If current date is within the reservation's date range, return the reservation's end date
                return Boolean.FALSE;
            }
        }

        // If no reservation is currently running, return null or handle it as needed
        return Boolean.TRUE;


    }



    public Integer countReservationsByEmployeeId(int employeeId) {
        return reservationRepository.countReservationsByEmployeeId(employeeId);
    }


    public EditReservationDTO getReservationsForToday(Integer userId) {
        // Get today's date
        LocalDate today = LocalDate.now();

        // Get reservations of the user for today
        List<Reservation> userReservations = reservationRepository.getUserReservationsList(userId);
        for (Reservation reservation : userReservations) {
            // Check if today falls within the reservation dates
            if (!today.isBefore(reservation.getReservation_start_date()) && !today.isAfter(reservation.getReservation_end_date())) {
                // If today is within the reservation dates, return the corresponding EditReservationDTO
                return new EditReservationDTO(
                        reservation.getReservation_start_date(),
                        reservation.getReservation_end_date(),
                        reservation.getEmployee().getId(),
                        reservation.getPlace().getId(),
                        reservation.getPlace().getNumber()
                );
            }
        }

        // If no reservation is found for today, return null or handle it as needed
        return null;
    }








}
