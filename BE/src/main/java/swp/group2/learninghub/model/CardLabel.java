package swp.group2.learninghub.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.*;
import swp.group2.learninghub.model.clientModel.CompositeModel;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
@IdClass(CompositeModel.class)
public class CardLabel {
    @Id
    private int labelId;
    @Id
    private int cardId;
}
