exports.compare = (a, b) => {
    if(a.PTS === b.PTS){
        return b.GD - a.GD;
    }

    return b.PTS - a.PTS;
}