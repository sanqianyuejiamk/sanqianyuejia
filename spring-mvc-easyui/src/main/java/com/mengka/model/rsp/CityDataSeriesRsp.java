package com.mengka.model.rsp;

import com.mengka.model.rsp.dto.SeriesRspDto;
import java.io.Serializable;
import java.util.List;

/**
 * @author huangyy
 * @date 2018/01/04.
 */
public class CityDataSeriesRsp implements Serializable {

    private List<SeriesRspDto> seriesList;

    public List<SeriesRspDto> getSeriesList() {
        return seriesList;
    }

    public void setSeriesList(List<SeriesRspDto> seriesList) {
        this.seriesList = seriesList;
    }
}
