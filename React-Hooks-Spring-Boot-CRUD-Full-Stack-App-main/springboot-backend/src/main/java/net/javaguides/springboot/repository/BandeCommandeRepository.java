package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.BandeCommande;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BandeCommandeRepository extends JpaRepository<BandeCommande, Long> {
    // Méthodes de filtrage personnalisées
    List<BandeCommande> findByEntite(String entite);
    List <BandeCommande> findByTypeMarche(String typeMarche);
    List<BandeCommande> findByEntiteAndTypeMarche(String entite, String typeMarche);
    List<BandeCommande> findByTransmisCommissionIsNull();
    List<BandeCommande> findByEntiteAndTransmisCommissionIsNull(String entite);
    List<BandeCommande> findByTypeMarcheAndTransmisCommissionIsNull(String typeMarche);
    List<BandeCommande> findByEntiteAndTypeMarcheAndTransmisCommissionIsNull(String entite, String typeMarche);
    List<BandeCommande> findByDateJugementIsNotNull();
    List<BandeCommande> findByEntiteAndDateJugementIsNotNull(String entite);
    List<BandeCommande> findByTypeMarcheAndDateJugementIsNotNull(String typeMarche);
    List<BandeCommande> findByEntiteAndTypeMarcheAndDateJugementIsNotNull(String entite, String typeMarche);
    List<BandeCommande> findByTransmisCommissionIsFalseAndDateJugementIsNull();
    List<BandeCommande> findByEntiteAndTransmisCommissionIsFalseAndDateJugementIsNull(String entite);
    List<BandeCommande> findByTypeMarcheAndTransmisCommissionIsFalseAndDateJugementIsNull(String typeMarche);
    List<BandeCommande> findByEntiteAndTypeMarcheAndTransmisCommissionIsFalseAndDateJugementIsNull(String entite, String typeMarche);



    // Méthodes pour le filtre "transmis"
    List<BandeCommande> findByEntiteAndTypeMarcheAndTransmisCommissionIsNotNull(String entite, String typeMarche);
    List<BandeCommande> findByEntiteAndTransmisCommissionIsNotNull(String entite);
    List<BandeCommande> findByTypeMarcheAndTransmisCommissionIsNotNull(String typeMarche);
    List<BandeCommande> findByTransmisCommissionIsNotNull();

    // Méthodes pour le filtre "juge"


    // Méthodes pour le filtre "encours"
    List<BandeCommande> findByEntiteAndTypeMarcheAndTransmisCommissionIsNullAndDateJugementIsNull(String entite, String typeMarche);
    List<BandeCommande> findByEntiteAndTransmisCommissionIsNullAndDateJugementIsNull(String entite);
    List<BandeCommande> findByTypeMarcheAndTransmisCommissionIsNullAndDateJugementIsNull(String typeMarche);
    List<BandeCommande> findByTransmisCommissionIsNullAndDateJugementIsNull();


    List<BandeCommande> findByTransmisCommissionIsNotNullAndDateOuvertureReelleIsNull();

    List<BandeCommande> findByTypeMarcheAndTransmisCommissionIsNotNullAndDateOuvertureReelleIsNull(String typeMarche);

    List<BandeCommande> findByEntiteAndTransmisCommissionIsNotNullAndDateOuvertureReelleIsNull(String entite);

    List<BandeCommande> findByEntiteAndTypeMarcheAndTransmisCommissionIsNotNullAndDateOuvertureReelleIsNull(String entite, String typeMarche);

    List<BandeCommande> findByEntiteAndTypeMarcheAndDateOuvertureReelleNotNullAndDateJugementIsNull(String entite, String typeMarche);

    List<BandeCommande> findByEntiteAndDateOuvertureReelleIsNotNullAndDateJugementIsNull(String entite);

    List<BandeCommande> findByTypeMarcheAndDateOuvertureReelleIsNotNullAndDateJugementIsNull(String typeMarche);

    List<BandeCommande> findByDateOuvertureReelleIsNotNullAndDateJugementIsNull();
}