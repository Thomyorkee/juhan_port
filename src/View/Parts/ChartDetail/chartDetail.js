import "View/css/chartDetail.css";
import classNames from 'classnames';

export function ChartDetail(props) {
    const { name, chartOn, setChartOn } = props;

    return (
        <div className={classNames("chart_wrap", { onChart: chartOn })}>
            <div className="chart_head">
                <p>{name}</p>
                <p style={{ padding: '0 25px 0 0', justifyContent: 'end' }}>
                    <button className="close_btn" onClick={() => setChartOn(undefined)} />
                </p>
            </div>
        </div>
    );
}