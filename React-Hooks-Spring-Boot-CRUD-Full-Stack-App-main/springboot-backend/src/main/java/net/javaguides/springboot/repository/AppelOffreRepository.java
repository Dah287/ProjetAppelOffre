package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.AppelOffre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface AppelOffreRepository extends JpaRepository<AppelOffre,Long> {

    // Trouver les appels d'offres par entité et type de marché
    List<AppelOffre> findByEntiteAndTypeMarche(String entite, String typeMarche);

    // Trouver les appels d'offres par entité
    List<AppelOffre> findByEntite(String entite);

    // Trouver les appels d'offres par type de marché
    List<AppelOffre> findByTypeMarche(String typeMarche);

    // Trouver les appels d'offres où dateOuvertureReelle n'est pas nulle
    List<AppelOffre> findByDateOuvertureReelleIsNotNull();

    // Trouver les appels d'offres par entité et où dateOuvertureReelle n'est pas nulle
    List<AppelOffre> findByEntiteAndDateOuvertureReelleIsNotNull(String entite);

    // Trouver les appels d'offres par type de marché et où dateOuvertureReelle n'est pas nulle
    List<AppelOffre> findByTypeMarcheAndDateOuvertureReelleIsNotNull(String typeMarche);

    // Trouver les appels d'offres où dateTransmisCe n'est pas nul
    List<AppelOffre> findByDatetransmisCeIsNotNull();

    // Trouver les appels d'offres par entité et où dateTransmisCe n'est pas nul
    List<AppelOffre> findByEntiteAndDatetransmisCeIsNotNull(String entite);

    // Trouver les appels d'offres par type de marché et où dateTransmisCe n'est pas nul
    List<AppelOffre> findByTypeMarcheAndDatetransmisCeIsNotNull(String typeMarche);

    // Trouver les appels d'offres par entité, type de marché, et où dateTransmisCe n'est pas nul
    List<AppelOffre> findByEntiteAndTypeMarcheAndDatetransmisCeIsNotNull(String entite, String typeMarche);

    // Trouver les appels d'offres par entité, type de marché, et où dateOuvertureReelle n'est pas nul
    List<AppelOffre> findByEntiteAndTypeMarcheAndDateOuvertureReelleIsNotNull(String entite, String typeMarche);
    List<AppelOffre> findByEntiteAndTypeMarcheAndDatetransmisCeIsNotNullAndDateOuvertureReelleIsNull(String entite, String typeMarche);

    List<AppelOffre> findByEntiteAndDatetransmisCeIsNotNullAndDateOuvertureReelleIsNull(String entite);

    List<AppelOffre> findByTypeMarcheAndDatetransmisCeIsNotNullAndDateOuvertureReelleIsNull(String typeMarche);

    List<AppelOffre> findByDatetransmisCeIsNotNullAndDateOuvertureReelleIsNull();
    // Méthode pour filtrer par entité, type de marché, dateOuvertureReelle non null et dateJugement null
    List<AppelOffre> findByEntiteAndTypeMarcheAndDateOuvertureReelleIsNotNullAndDateJugementIsNull(String entite, String typeMarche);

    // Méthode pour filtrer par entité, dateOuvertureReelle non null et dateJugement null
    List<AppelOffre> findByEntiteAndDateOuvertureReelleIsNotNullAndDateJugementIsNull(String entite);

    // Méthode pour filtrer par type de marché, dateOuvertureReelle non null et dateJugement null
    List<AppelOffre> findByTypeMarcheAndDateOuvertureReelleIsNotNullAndDateJugementIsNull(String typeMarche);

    // Méthode pour filtrer par dateOuvertureReelle non null et dateJugement null
    List<AppelOffre> findByDateOuvertureReelleIsNotNullAndDateJugementIsNull();

    // Méthode pour filtrer par entité, type de marché et dateJugement non nul
    List<AppelOffre> findByEntiteAndTypeMarcheAndDateJugementIsNotNull(String entite, String typeMarche);

    // Méthode pour filtrer par entité et dateJugement non nul
    List<AppelOffre> findByEntiteAndDateJugementIsNotNull(String entite);

    // Méthode pour filtrer par type de marché et dateJugement non nul
    List<AppelOffre> findByTypeMarcheAndDateJugementIsNotNull(String typeMarche);
    // Méthode pour récupérer toutes les lignes où dateJugement est non nul
    List<AppelOffre> findByDateJugementIsNotNull();

}
