import React from "react"
import MaterialTable from "material-table";

const Table = () => {
  const data = [
    { Client: "0001", PIL: 10, ACE: 12, AA: 10, SSQ: 10, PTS: 10, ISI: 10, DEP: 10, GAD: 10, SSRS: 10, Overall: 100 },
    { Client: "0002", PIL: 10, ACE: 12, AA: 10, SSQ: 10, PTS: 10, ISI: 10, DEP: 10, GAD: 10, SSRS: 10, Overall: 100 },
    { Client: "0003", PIL: 10, ACE: 12, AA: 10, SSQ: 10, PTS: 10, ISI: 10, DEP: 10, GAD: 10, SSRS: 10, Overall: 100 },
    { Client: "0004", PIL: 10, ACE: 12, AA: 10, SSQ: 10, PTS: 10, ISI: 10, DEP: 10, GAD: 10, SSRS: 10, Overall: 100 },
    { Client: "0005", PIL: 10, ACE: 12, AA: 10, SSQ: 10, PTS: 10, ISI: 10, DEP: 10, GAD: 10, SSRS: 10, Overall: 100 },
    { Client: "0006", PIL: 10, ACE: 12, AA: 10, SSQ: 10, PTS: 10, ISI: 10, DEP: 10, GAD: 10, SSRS: 10, Overall: 100 },
    { Client: "0007", PIL: 10, ACE: 12, AA: 10, SSQ: 10, PTS: 10, ISI: 10, DEP: 10, GAD: 10, SSRS: 10, Overall: 100 },

  ];

  const columns = [
    {
      title: "Client",
      field: "Client",
      cellStyle: {
        backgroundColor: "#039BE5",
        color: "#FFF"
      },
      headerStyle: {
        backgroundColor: '#0d5b28',
        color: "#FFF"
      }
    },
    {
      title: "PIL",
      field: "PIL",
    },
    {
      title: "ACE",
      field: "ACE",
    },
    {
      title: "AA",
      field: "AA",
    },
    {
      title: "SSQ",
      field: "SSQ",
    },
    {
      title: "PTS",
      field: "PTS",
    },
    {
      title: "ISI",
      field: "ISI",
    },
    {
      title: "DEP",
      field: "DEP",
    },
    {
      title: "GAD",
      field: "GAD",
    },
    {
      title: "SSRS",
      field: "SSRS",
    },
    {
      title: "Overall",
      field: "Overall",
    },
  ];

  return (
    <MaterialTable title="Employee Details" data={data} columns={columns} options={{ search: true, paging: false, filtering: true, exportButton: true }} />
  );

};
export default Table;