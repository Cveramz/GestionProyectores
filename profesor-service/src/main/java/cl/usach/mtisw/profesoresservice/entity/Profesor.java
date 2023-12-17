package cl.usach.mtisw.profesoresservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "profesor")
@NoArgsConstructor
@AllArgsConstructor
public class Profesor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    private String RUN;
    private String nombre;
    private String habilitado;
    private String horas_pasadas; // (Si o No) Si se pasa de 6 horas de prestamo se pondrá que sí,
                                  // y quedará inhabilitado por 7 dias para pedir proyectores
    private Integer strikes; // Si tiene 3 strikes queda inhabilitado para pedir proyectores
}
