package swp.group2.learninghub.model.clientModel;

import lombok.*;

import java.io.Serializable;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class CompositeModel implements Serializable {
    private int labelId;
    private int cardId;
}
