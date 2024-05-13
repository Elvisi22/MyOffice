package com.myOffice.Project.service;

import com.myOffice.Project.entity.Place;
import com.myOffice.Project.repository.PlacesRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor

public class PlaceService {

    private PlacesRepository placesRepository;


    public List<Place> getAllPlaces (){
        return placesRepository.findAll();
    }





}
