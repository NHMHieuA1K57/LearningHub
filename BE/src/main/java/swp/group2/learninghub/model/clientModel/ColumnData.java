package swp.group2.learninghub.model.clientModel;

import lombok.*;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ColumnData {
    private String title;
    private ArrayList<CardData> items;
}
