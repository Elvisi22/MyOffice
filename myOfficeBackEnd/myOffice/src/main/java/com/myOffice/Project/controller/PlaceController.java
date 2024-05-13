package com.myOffice.Project.controller;

import com.myOffice.Project.entity.Place;
import com.myOffice.Project.service.PlaceService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
@NoArgsConstructor
public class PlaceController {
    @Autowired
    private PlaceService placeService;


    @GetMapping("/get-all-seats")
    public ResponseEntity<List<Place>> getAllPlaces(){
        List<Place> allPlaces = placeService.getAllPlaces();

        return new ResponseEntity<>(allPlaces , HttpStatus.OK);
    }
}
