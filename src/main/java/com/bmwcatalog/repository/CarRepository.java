package com.bmwcatalog.repository;

import com.bmwcatalog.entity.CarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarRepository extends JpaRepository<CarEntity, Integer> {
    List<CarEntity> findByName(String series);
    Optional<CarEntity> findById(int id);
}
