package swp.group2.learninghub.model.clientModel;

import lombok.*;
import swp.group2.learninghub.model.BoardLabel;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class CardData {
    private int id;
    public String cardTitle;
    public List<BoardLabel> labels;
}
