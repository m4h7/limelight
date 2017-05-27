import DataLoader from 'dataloader';

var recordLoader = new DataLoader(ids => Promise.all(ids.map(id => loadRecord(id))));

class Record {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
};

function loadRecord(id) {
  if (id === 1) {
    return Promise.resolve(new Record(1, 'record 1'));
  } else if (id === 2) {
    return Promise.resolve(new Record(2, 'record 2'));
  }
  return Promise.reject(new Error('Record not found'));
}

function getRecords() {
  return [
    loadRecord(1),
    loadRecord(2),
  ];
}

var recordsLoader = new DataLoader(keys =>
  Promise.all(keys.map(_ => getRecords())),
);

export { recordLoader, recordsLoader, Record };
