package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.AppelOffre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface AppelOffreRepository extends JpaRepository<AppelOffre,Long> {

    // Recherche par entité
    List<AppelOffre> findByEntite(String entite);

    // Recherche par type de marché
    List<AppelOffre> findByTypeMarche(String typeMarche);

    // Recherche par entité et type de marché
    List<AppelOffre> findByEntiteAndTypeMarche(String entite, String typeMarche);
}
