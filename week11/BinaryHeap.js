class BinaryHeap {
  constructor(data, compare) {
    this.data = data;
    this.compare = compare;
  }
  take() {
    if (!this.data.length) {
      return
    }
    let min = this.data[0];
    let i = 0;
    // fix heap
    while (i < this.data.length) {
      if (i * 2 + 1 >= this.data.length) {
        break;
      }
      // 如果是右节点没有的
      if (i * 2 + 2 >= this.data.length) {
        i = i * 2 + 1;
        break;
      }
      if (this.compare(this.data[i * 2 + 1], this.data[i * 2 + 2]) < 0) {
        this.data[i] = this.data[i * 2 + 1];
        i = i * 2 + 1;
      } else {
        this.data[i] = this.data[i * 2 + 2];
        i = i * 2 + 2;
      }
    }
    if (i < this.data.length - 1) {
      this.insertAt(i, this.data.pop())
    } else {
      this.data.pop()
    }
    return min
  }
  insert(v) {
    this.data.push(v)
  }
  insertAt(i, v) {
    this.data[i] = v;
    while (i > 0 && this.compare(v)) {

    }
  }
  get length() {
    return this.data.length
  }
}