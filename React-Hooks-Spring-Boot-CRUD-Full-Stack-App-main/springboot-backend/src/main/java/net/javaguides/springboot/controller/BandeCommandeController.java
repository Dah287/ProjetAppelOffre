package net.javaguides.springboot.controller;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.BandeCommande;
import net.javaguides.springboot.repository.BandeCommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/bande-commande")
public class BandeCommandeController {

    @Autowired
    private BandeCommandeRepository bandeCommandeRepository;

    // Créer une nouvelle bande de commande
    @PostMapping
    public BandeCommande createBandeCommande(@RequestBody BandeCommande bandeCommande) {
        return bandeCommandeRepository.save(bandeCommande);
    }

    // Récupérer une bande de commande par ID
    @GetMapping("/{id}")
    public ResponseEntity<BandeCommande> getBandeCommandeById(@PathVariable long id) {
        BandeCommande bandeCommande = bandeCommandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BandeCommande not exist with id: " + id));
        return ResponseEntity.ok(bandeCommande);
    }

    // Mettre à jour une bande de commande
    @PutMapping("/{id}")
    public ResponseEntity<BandeCommande> updateBandeCommande(
            @PathVariable long id,
            @RequestBody BandeCommande bandeCommandeDetails) {

        BandeCommande updateBandeCommande = bandeCommandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BandeCommande not exist with id: " + id));

        updateBandeCommande.setEntite(bandeCommandeDetails.getEntite());
        updateBandeCommande.setObjet(bandeCommandeDetails.getObjet());
        updateBandeCommande.setTypeMarche(bandeCommandeDetails.getTypeMarche());
        updateBandeCommande.setEstimation(bandeCommandeDetails.getEstimation());
        updateBandeCommande.setTransmisCommission(bandeCommandeDetails.getTransmisCommission());
        updateBandeCommande.setNumeroBC(bandeCommandeDetails.getNumeroBC());
        updateBandeCommande.setDateOuvertureReelle(bandeCommandeDetails.getDateOuvertureReelle());
        updateBandeCommande.setHeureOuverture(bandeCommandeDetails.getHeureOuverture());
        updateBandeCommande.setDateJugement(bandeCommandeDetails.getDateJugement());
        updateBandeCommande.setMontantBC(bandeCommandeDetails.getMontantBC());
        updateBandeCommande.setObservations(bandeCommandeDetails.getObservations());

        bandeCommandeRepository.save(updateBandeCommande);
        return ResponseEntity.ok(updateBandeCommande);
    }

    // Supprimer une bande de commande
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteBandeCommande(@PathVariable long id) {
        BandeCommande bandeCommande = bandeCommandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BandeCommande not exist with id: " + id));

        bandeCommandeRepository.delete(bandeCommande);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Récupérer les bandes de commande avec filtres
    @GetMapping
    public List<BandeCommande> getBandeCommandes(
            @RequestParam(required = false) String entite,
            @RequestParam(required = false) String typeMarche,
            @RequestParam(required = false) String fitre) {

        if ("transmis".equals(fitre)) {
            // Bande commande transmise à la commission
            if (entite != null && typeMarche != null) {
                return bandeCommandeRepository.findByEntiteAndTypeMarcheAndTransmisCommissionIsNotNullAndDateOuvertureReelleIsNull(entite, typeMarche);
            } else if (entite != null) {
                return bandeCommandeRepository.findByEntiteAndTransmisCommissionIsNotNullAndDateOuvertureReelleIsNull(entite);
            } else if (typeMarche != null) {
                return bandeCommandeRepository.findByTypeMarcheAndTransmisCommissionIsNotNullAndDateOuvertureReelleIsNull(typeMarche);
            } else {
                return bandeCommandeRepository.findByTransmisCommissionIsNotNullAndDateOuvertureReelleIsNull();
            }
        } else if ("juge".equals(fitre)) {
            // Bande commande jugée
            if (entite != null && typeMarche != null) {
                return bandeCommandeRepository.findByEntiteAndTypeMarcheAndDateJugementIsNotNull(entite, typeMarche);
            } else if (entite != null) {
                return bandeCommandeRepository.findByEntiteAndDateJugementIsNotNull(entite);
            } else if (typeMarche != null) {
                return bandeCommandeRepository.findByTypeMarcheAndDateJugementIsNotNull(typeMarche);
            } else {
                return bandeCommandeRepository.findByDateJugementIsNotNull();
            }
        }else if ("ouv".equals(fitre)) {
            // Bande commande jugée
            if (entite != null && typeMarche != null) {
                return bandeCommandeRepository.findByEntiteAndTypeMarcheAndDateOuvertureReelleNotNullAndDateJugementIsNull(entite, typeMarche);
            } else if (entite != null) {
                return bandeCommandeRepository.findByEntiteAndDateOuvertureReelleIsNotNullAndDateJugementIsNull(entite);
            } else if (typeMarche != null) {
                return bandeCommandeRepository.findByTypeMarcheAndDateOuvertureReelleIsNotNullAndDateJugementIsNull(typeMarche);
            } else {
                return bandeCommandeRepository.findByDateOuvertureReelleIsNotNullAndDateJugementIsNull();
            }
        }
        else if ("encours".equals(fitre)) {
            // Bande commande en cours
            if (entite != null && typeMarche != null) {
                return bandeCommandeRepository.findByEntiteAndTypeMarcheAndTransmisCommissionIsNullAndDateJugementIsNull(entite, typeMarche);
            } else if (entite != null) {
                return bandeCommandeRepository.findByEntiteAndTransmisCommissionIsNullAndDateJugementIsNull(entite);
            } else if (typeMarche != null) {
                return bandeCommandeRepository.findByTypeMarcheAndTransmisCommissionIsNullAndDateJugementIsNull(typeMarche);
            } else {
                return bandeCommandeRepository.findByTransmisCommissionIsNullAndDateJugementIsNull();
            }
        } else {
            // Pas de filtre de statut
            if (entite != null && typeMarche != null) {
                return bandeCommandeRepository.findByEntiteAndTypeMarche(entite, typeMarche);
            } else if (entite != null) {
                return bandeCommandeRepository.findByEntite(entite);
            } else if (typeMarche != null) {
                return bandeCommandeRepository.findByTypeMarche(typeMarche);
            } else {
                return bandeCommandeRepository.findAll();
            }
        }
    }

    // Dashboard pour les statistiques
    @GetMapping("/dashboard")
    public List<Map<String, Object>> getDashboardData(@RequestParam(required = false) String entite) {
        List<BandeCommande> bandeCommandes;

        if (entite == null || entite.isEmpty()) {
            bandeCommandes = bandeCommandeRepository.findAll();
        } else {
            bandeCommandes = bandeCommandeRepository.findByEntite(entite);
        }

        // Calcul des totaux globaux si aucune entité spécifique
        Map<String, Object> globalRow = new HashMap<>();
        if (entite == null || entite.isEmpty()) {
            globalRow.put("entite", "Total");

            long totalBandeCommandes = bandeCommandes.size();
            long totalTransmisCommission = bandeCommandes.stream()
                    .filter(bc -> bc.getTransmisCommission() != null && bc.getDateOuvertureReelle() == null)
                    .count();
            long totalJuges = bandeCommandes.stream()
                    .filter(bc -> bc.getDateJugement() != null)
                    .count();
            long totalLances = bandeCommandes.stream()
                    .filter(bc -> bc.getDateOuvertureReelle() != null)
                    .count();
            long totalEnCours = totalBandeCommandes - (totalTransmisCommission + totalJuges);

            double estimationTotal = bandeCommandes.stream()
                    .mapToDouble(bc -> bc.getEstimation() != null ? bc.getEstimation() : 0.0)
                    .sum();
            double montantTotalBC = bandeCommandes.stream()
                    .mapToDouble(bc -> bc.getMontantBC() != null ? bc.getMontantBC() : 0.0)
                    .sum();

            globalRow.put("totalBandeCommandes", totalBandeCommandes);
            globalRow.put("totalTransmisCommission", totalTransmisCommission);
            globalRow.put("totalJuges", totalJuges);
            globalRow.put("totalEnCours", totalEnCours);
            globalRow.put("totalLances", totalLances);
            globalRow.put("estimationTotal", estimationTotal);
            globalRow.put("montantTotalBC", montantTotalBC);
        }

        // Calcul par entité
        List<Map<String, Object>> result = bandeCommandes.stream()
                .collect(Collectors.groupingBy(BandeCommande::getEntite))
                .entrySet().stream()
                .map(entry -> {
                    Map<String, Object> row = new HashMap<>();
                    row.put("entite", entry.getKey());

                    long totalTransmisCommission = entry.getValue().stream()
                            .filter(bc -> bc.getTransmisCommission() != null && bc.getDateOuvertureReelle() == null)
                            .count();
                    long totalJuges = entry.getValue().stream()
                            .filter(bc -> bc.getDateJugement() != null)
                            .count();
                    long totalEnCours = entry.getValue().size() - (totalTransmisCommission + totalJuges);
                    long totalLances = entry.getValue().stream()
                            .filter(bc -> bc.getDateOuvertureReelle() != null)
                            .count();
                    double estimationTotal = entry.getValue().stream()
                            .mapToDouble(bc -> bc.getEstimation() != null ? bc.getEstimation() : 0.0)
                            .sum();
                    double montantTotalBC = entry.getValue().stream()
                            .mapToDouble(bc -> bc.getMontantBC() != null ? bc.getMontantBC() : 0.0)
                            .sum();

                    row.put("totalBandeCommandes", entry.getValue().size());
                    row.put("totalTransmisCommission", totalTransmisCommission);
                    row.put("totalJuges", totalJuges);
                    row.put("totalEnCours", totalEnCours);
                    row.put("totalLances", totalLances);
                    row.put("estimationTotal", estimationTotal);
                    row.put("montantTotalBC", montantTotalBC);

                    return row;
                })
                .collect(Collectors.toList());

        // Ajouter la ligne de total global si aucune entité spécifique
        if (entite == null || entite.isEmpty()) {
            result.add(0, globalRow);
        }

        return result;
    }
}