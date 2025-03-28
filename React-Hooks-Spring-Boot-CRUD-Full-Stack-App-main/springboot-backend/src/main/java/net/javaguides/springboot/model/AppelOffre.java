package net.javaguides.springboot.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "AppelOffre")
public class AppelOffre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Informations générales
    private Long numero;
    private String entite; // ENTITE
    private String objet; // Objet
    private String typeMarche; // TYPE MARCHE
    private Double estimation; // Estimation
    private String pme; // PME
    private Long numeroVisa;
    // Section Prévisionnelle
    private LocalDate moisPublicationPrevisionnelle; // Mois de publication
    private LocalDate dateOuverturePrevisionnelle; // DATE D'OUVERTURE PREVISIONNELLE
    private String heure;
    // Section Réalisation
    private LocalDate datetransmisCe; // Transmis CE
    private LocalDate dateobservationMc; // Observation MC
    private LocalDate dateOuvertureReelle; // Date ouverture (réelle)
    private LocalDate dateJugement; // Date jugement
    private String observations; // OBSERVATIONS
    private String Attributaire;
    private Double MontantTTC;
    private LocalDate marcheVise;
    // Getters et Setters

}
