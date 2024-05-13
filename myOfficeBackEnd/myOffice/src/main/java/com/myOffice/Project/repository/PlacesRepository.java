package com.myOffice.Project.repository;

import com.myOffice.Project.entity.Place;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacesRepository extends JpaRepository<Place , Integer> {
}
