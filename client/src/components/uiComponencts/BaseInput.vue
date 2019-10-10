<template>
    <div>
        <input
            :type="typeProp"
            class="input"
            :placeholder="placeholderProp"
            :list="listProp"
            :size="sizeProp"
            @input="$emit('input', $event.target.value)"
        />
        <datalist :id="listProp">
            <slot name="dataList"></slot>
        </datalist>
    </div>
</template>

<script>
export default {
    name: 'base-input',
    props: {
        typeProp: String,
        placeholderProp: String,
        listProp: String,
        sizeProp: String,
    },
    data: function() {
        return {};
    },
};
</script>

<style scoped>
.input {
    text-align: center;
    border: none;
    border-bottom: 1px solid #aaa;
    min-height: 100%;
    font-size: 20px;
}
input::placeholder {
    text-align: center;
}

input:focus {
    outline: none;
    box-shadow: 0px 0px 3px #ccc, 0 10px 15px white inset;
}
</style>
