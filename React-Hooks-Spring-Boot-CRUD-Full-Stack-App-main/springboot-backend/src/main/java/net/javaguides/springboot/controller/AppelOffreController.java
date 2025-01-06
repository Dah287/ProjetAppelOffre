package net.javaguides.springboot.controller;


import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.AppelOffre;
import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.repository.AppelOffreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/appelOffre")
public class AppelOffreController {

    @Autowired
    private AppelOffreRepository  appelOffreRepository;


//   @GetMapping
//    public List<AppelOffre> getAllAppelOffres()
//    {
//        return appelOffreRepository.findAll();
//    }

    // create
    @PostMapping
    public  AppelOffre createappelOffre(@RequestBody AppelOffre appelOffre)
    {
        return appelOffreRepository.save(appelOffre);
    }

    // build get employee by id REST API
    @GetMapping("{id}")
    public ResponseEntity<AppelOffre> getEmployeeById(@PathVariable  long id){
        AppelOffre appelOffre = appelOffreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("appelOffre not exist with id:" + id));
        return ResponseEntity.ok(appelOffre);
    }

    @PutMapping("{id}")
    public ResponseEntity<AppelOffre> updateEmployee(@PathVariable long id,@RequestBody AppelOffre appelOffreDetails) {
        AppelOffre updateappelOffre = appelOffreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("appelOffre not exist with id: " + id));
        updateappelOffre.setNumero(appelOffreDetails.getNumero());
        updateappelOffre.setEntite(appelOffreDetails.getEntite());
        updateappelOffre.setObjet(appelOffreDetails.getObjet());
        updateappelOffre.setTypeMarche(appelOffreDetails.getTypeMarche());
        updateappelOffre.setEstimation(appelOffreDetails.getEstimation());
        updateappelOffre.setPme(appelOffreDetails.getPme());
        //
        updateappelOffre.setMoisPublicationPrevisionnelle(appelOffreDetails.getMoisPublicationPrevisionnelle());
        updateappelOffre.setDateOuverturePrevisionnelle(appelOffreDetails.getDateOuverturePrevisionnelle());

        updateappelOffre.setDatetransmisCe(appelOffreDetails.getDatetransmisCe());
        updateappelOffre.setDateobservationMc(appelOffreDetails.getDateobservationMc());
        updateappelOffre.setDateOuvertureReelle(appelOffreDetails.getDateOuvertureReelle());
     updateappelOffre.setDateJugement(appelOffreDetails.getDateJugement());
updateappelOffre.setObservations(appelOffreDetails.getObservations());


        appelOffreRepository.save(updateappelOffre);

        return ResponseEntity.ok(updateappelOffre);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteappelOffre(@PathVariable long id){

        AppelOffre appelOffre = appelOffreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AppelOffre not exist with id: " + id));

        appelOffreRepository.delete(appelOffre);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }


    // Endpoint pour récupérer les appel d'offres filtrés
    @GetMapping
    public List<AppelOffre> getAppelOffres(
            @RequestParam(required = false) String entite,
            @RequestParam(required = false) String typeMarche) {

        if (entite != null && typeMarche != null) {
            return appelOffreRepository.findByEntiteAndTypeMarche(entite,typeMarche);
        } else if (entite != null) {
            return appelOffreRepository.findByEntite(entite);
        } else if (typeMarche != null) {
            return appelOffreRepository.findByTypeMarche(typeMarche);
        } else {
            return appelOffreRepository.findAll(); // Retourne toutes les offres si aucun filtre n'est appliqué
        }
    }

}
