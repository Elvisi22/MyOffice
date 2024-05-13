package com.myOffice.Project.repository;

import com.myOffice.Project.entity.Place;
import com.myOffice.Project.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation , Integer> {

    @Query("SELECT r FROM Reservation r WHERE r.place = :place " +
            "AND ((r.reservation_start_date BETWEEN :startDate AND :endDate) " +
            "OR (r.reservation_end_date BETWEEN :startDate AND :endDate) " +
            "OR (:startDate BETWEEN r.reservation_start_date AND r.reservation_end_date) " +
            "OR (:endDate BETWEEN r.reservation_start_date AND r.reservation_end_date))")
    List<Reservation> findByPlaceAndDatesOverlap(@Param("place") Place place,
                                                 @Param("startDate") LocalDate startDate,
                                                 @Param("endDate") LocalDate endDate);


    @Query("SELECT r FROM Reservation r WHERE r.employee.id = :id")
    List<Reservation> getUserReservationsList(@Param("id") Integer id);

    @Query(value = "SELECT * FROM Reservation WHERE place_id = :placeId", nativeQuery = true)
    List<Reservation> findByPlaceId(@Param("placeId") Integer placeId);


    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.employee.id = :employeeId")
    Integer countReservationsByEmployeeId(int employeeId);
}
