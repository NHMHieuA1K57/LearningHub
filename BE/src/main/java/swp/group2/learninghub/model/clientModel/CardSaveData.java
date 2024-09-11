package swp.group2.learninghub.model.clientModel;


import lombok.*;
import swp.group2.learninghub.model.Card;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class CardSaveData {
    public Card card;
    public List<Integer> labels;
}
